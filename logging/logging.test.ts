import { MetricUnits, Metrics } from "@aws-lambda-powertools/metrics";
import { LogEvents } from "./log-events";
import { FraudLogger } from "./logging";
import { Logger } from "@aws-lambda-powertools/logger";

describe("FraudLogger", () => {
  let mockLogger: Logger;
  let mockMetrics: Metrics;
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("should set logger level to DEBUG when environment is development", () => {
    process.env.POWERTOOLS_LOG_LEVEL = 'DEBUG';
    const logger = new FraudLogger();
    expect(logger.getLevelName()).toEqual("DEBUG");
  });

  it("should not set logger level to DEBUG when environment is not development", () => {
    const logger = new FraudLogger();
    expect(logger.getLevelName()).not.toEqual("DEBUG");
  });
  const infoSpy = jest.spyOn(Logger.prototype, "info").mockImplementation();
  it("should handle calls without optional message IDs", () => {
    const logger = new FraudLogger();
    const mockLogEvent = "mockLogEvent";

    jest.spyOn(logger.metrics, "addMetric");

    logger.logEventProcessed(mockLogEvent);

    expect(logger.info).toHaveBeenCalledWith(
      mockLogEvent,
      { previousMessageId: undefined },
      { newMessageId: undefined }
    );
    expect(infoSpy).toHaveBeenCalledTimes(1);

    expect(logger.metrics.addMetric).toHaveBeenCalledWith(
      mockLogEvent,
      MetricUnits.Count,
      1
    );
    expect(logger.metrics.addMetric).toHaveBeenCalledTimes(1);
  });
});

describe("logErrorProcessing", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const errorSpy = jest.spyOn(Logger.prototype, "error").mockImplementation();
  it("should be defined", async () => {
    const logger = new FraudLogger();
    expect(logger.logErrorProcessing).toBeDefined();
  });

  it("should call logger.error", () => {
    const logger = new FraudLogger();
    jest.spyOn(logger.metrics, "addMetric");

    logger.logErrorProcessing("12345", "Error Message");

    expect(errorSpy).toHaveBeenCalledWith(
      LogEvents.ErrorProcessing,
      { messageId: "12345" },
      { error: "Error Message" }
    );
  });
});

describe("logMessage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    const logger = new FraudLogger();
    expect(logger.logMessage).toBeDefined();
  });

  it("should call logger.info", () => {
    const logger = new FraudLogger();
    jest.spyOn(logger.metrics, "addMetric").mockImplementation(() => null);

    const mockMessage = "mockMessage";
    logger.logMessage(mockMessage, "mockMessageId");

    expect(logger.info).toHaveBeenCalledWith(mockMessage, {
      messageId: "mockMessageId",
    });
  });
});

describe("logDebug", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const debugSpy = jest.spyOn(Logger.prototype, "debug").mockImplementation();
  it("should be defined", () => {
    const logger = new FraudLogger();
    expect(logger.logDebug).toBeDefined();
  });

  it("should call logger.debug when logger level is DEBUG", () => {
    process.env.POWERTOOLS_LOG_LEVEL = 'DEBUG';
    const logger = new FraudLogger();
    const testDebugMessage = "Test Debug Message";
    logger.logDebug(testDebugMessage);

    expect(debugSpy).toHaveBeenCalledWith(testDebugMessage);
  });

  it("should not call logger.debug when logger level is not DEBUG", () => {
    process.env.POWERTOOLS_LOG_LEVEL = 'INFO';
    const logger = new FraudLogger();
    const testDebugMessage = "Test Debug Message";
    logger.logDebug(testDebugMessage);

    expect(debugSpy).not.toHaveBeenCalled();
  });
});
