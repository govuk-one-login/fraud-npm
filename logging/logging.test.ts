import { Metrics } from "@aws-lambda-powertools/metrics";
import { LogEvents } from "./log-events";
import { FraudLogger } from "./logging";
import { Logger } from "@aws-lambda-powertools/logger";

const fraudLogger = new FraudLogger(new Logger(), new Metrics());

describe("FraudLogger", () => {
  let mockLogger: Logger;
  let mockMetrics: Metrics;

  beforeEach(() => {
    jest.resetAllMocks();
    mockLogger = {
      setLogLevel: jest.fn(),
    } as unknown as Logger;
    mockMetrics = {} as unknown as Metrics;
  });

  it("should set logger level to DEBUG when environment is development", () => {
    new FraudLogger(mockLogger, mockMetrics, "development");
    expect(mockLogger.setLogLevel).toHaveBeenCalledWith("DEBUG");
  });

  it("should not set logger level to DEBUG when environment is not development", () => {
    new FraudLogger(mockLogger, mockMetrics, "production");
    expect(mockLogger.setLogLevel).not.toHaveBeenCalledWith("DEBUG");
  });

  describe("logStartedProcessing", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should be defined", () => {});

    it("should call logger.info and metrics.AddMetric", () => {
      jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

      expect(fraudLogger.logger.info).toHaveBeenCalledWith(
        LogEvents.StartedProcessing,
        {
          messageId: "12345",
        }
      );
    });
  });

  describe("logSuccessfullyProcessed", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should be defined", async () => {});

    it("should call logger.info", () => {
      jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

      expect(fraudLogger.logger.info).toHaveBeenCalledWith(
        LogEvents.SuccessfullyProcessed,
        { previousMessageId: "12345" },
        { newMessageId: "678910" }
      );
    });
  });

  describe("logErrorProcessing", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should be defined", async () => {
      expect(fraudLogger.logErrorProcessing).toBeDefined();
    });

    it("should call logger.error", () => {
      jest.spyOn(fraudLogger.logger, "error").mockImplementation(() => null);
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

      fraudLogger.logErrorProcessing("12345", "Error Message");

      expect(fraudLogger.logger.error).toHaveBeenCalledWith(
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
      expect(fraudLogger.logMessage).toBeDefined();
    });

    it("should call logger.info", () => {
      jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

      const testMessage = "Test Message";
      fraudLogger.logMessage(testMessage);

      expect(fraudLogger.logger.info).toHaveBeenCalledWith(testMessage);
    });
  });
  describe("logDebug", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should be defined", () => {
      expect(fraudLogger.logDebug).toBeDefined();
    });

    it("should call logger.debug when logger level is DEBUG", () => {
      jest.spyOn(fraudLogger.logger, "getLevelName").mockReturnValue("DEBUG");
      jest.spyOn(fraudLogger.logger, "debug").mockImplementation(() => null);

      const testDebugMessage = "Test Debug Message";
      fraudLogger.logDebug(testDebugMessage);

      expect(fraudLogger.logger.debug).toHaveBeenCalledWith(testDebugMessage);
    });

    it("should not call logger.debug when logger level is not DEBUG", () => {
      jest.spyOn(fraudLogger.logger, "getLevelName").mockReturnValue("INFO");
      jest.spyOn(fraudLogger.logger, "debug").mockImplementation(() => null);

      const testDebugMessage = "Test Debug Message";
      fraudLogger.logDebug(testDebugMessage);

      expect(fraudLogger.logger.debug).not.toHaveBeenCalled();
    });
  });
});
