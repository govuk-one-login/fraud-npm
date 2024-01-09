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

  it("should set logger level to DEBUG when environment variable set to debug", () => {
    process.env.POWERTOOLS_LOG_LEVEL = "DEBUG";
    const logger = new FraudLogger("Jest");
    expect(logger.getLevelName()).toEqual("DEBUG");
  });

  it("should not set logger level to DEBUG when environment variable anything else", () => {
    const logger = new FraudLogger("Jest");
    expect(logger.getLevelName()).not.toEqual("DEBUG");
  });
});

describe("debugWithMetrics", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const debugSpy = jest.spyOn(Logger.prototype, "debug").mockImplementation();
  it("should be defined", async () => {
    const logger = new FraudLogger("Jest");
    expect(logger.debugWithMetrics).toBeDefined();
  });

  it("should call logger.debug and addMetrics", () => {
    const logger = new FraudLogger("Jest");
    let debugMetricsSpy = jest.spyOn(logger.metrics, "addMetric");

    logger.debugWithMetrics(
      "12345",
      LogEvents.StartedProcessing,
      "Debug Message"
    );

    expect(debugSpy).toHaveBeenCalledWith("12345", "Debug Message");
    expect(debugSpy).toHaveBeenCalledTimes(1);

    expect(debugMetricsSpy).toHaveBeenCalledWith(
      LogEvents.StartedProcessing,
      MetricUnits.Count,
      1
    );
    expect(debugMetricsSpy).toHaveBeenCalledTimes(1);
  });
});
describe("infoWithMetrics", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const infoSpy = jest.spyOn(Logger.prototype, "info").mockImplementation();
  it("should be defined", async () => {
    const logger = new FraudLogger("Jest");
    expect(logger.infoWithMetrics).toBeDefined();
  });

  it("should call logger.info and addMetrics", () => {
    const logger = new FraudLogger("Jest");
    let infoMetricsSpy = jest.spyOn(logger.metrics, "addMetric");

    logger.infoWithMetrics(
      "12345",
      LogEvents.StartedProcessing,
      "Info Message"
    );

    expect(infoSpy).toHaveBeenCalledWith("12345", "Info Message");
    expect(infoSpy).toHaveBeenCalledTimes(1);

    expect(infoMetricsSpy).toHaveBeenCalledWith(
      LogEvents.StartedProcessing,
      MetricUnits.Count,
      1
    );
    expect(infoMetricsSpy).toHaveBeenCalledTimes(1);
  });
});
describe("warnWithMetrics", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const warnSpy = jest.spyOn(Logger.prototype, "warn").mockImplementation();
  it("should be defined", async () => {
    const logger = new FraudLogger("Jest");
    expect(logger.warnWithMetrics).toBeDefined();
  });

  it("should call logger.warn and addMetrics", () => {
    const logger = new FraudLogger("Jest");
    let warnMetricsSpy = jest.spyOn(logger.metrics, "addMetric");

    logger.warnWithMetrics(
      "12345",
      LogEvents.StartedProcessing,
      "Warn Message"
    );

    expect(warnSpy).toHaveBeenCalledWith("12345", "Warn Message");
    expect(warnSpy).toHaveBeenCalledTimes(1);

    expect(warnMetricsSpy).toHaveBeenCalledWith(
      LogEvents.StartedProcessing,
      MetricUnits.Count,
      1
    );
    expect(warnMetricsSpy).toHaveBeenCalledTimes(1);
  });
});
describe("errorWithMetrics", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const errorSpy = jest.spyOn(Logger.prototype, "error").mockImplementation();
  it("should be defined", async () => {
    const logger = new FraudLogger("Jest");
    expect(logger.errorWithMetrics).toBeDefined();
  });

  it("should call logger.error", () => {
    const logger = new FraudLogger("Jest");
    let errorMetricsSpy = jest.spyOn(logger.metrics, "addMetric");

    logger.errorWithMetrics(
      "12345",
      LogEvents.ErrorProcessing,
      "Error Message"
    );

    expect(errorSpy).toHaveBeenCalledWith("12345", "Error Message");
    expect(errorSpy).toHaveBeenCalledTimes(1);

    expect(errorMetricsSpy).toHaveBeenCalledWith(
      LogEvents.ErrorProcessing,
      MetricUnits.Count,
      1
    );
    expect(errorMetricsSpy).toHaveBeenCalledTimes(1);
  });
});
describe("criticalWithMetrics", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const criticalSpy = jest.spyOn(Logger.prototype, "critical").mockImplementation();
  it("should be defined", async () => {
    const logger = new FraudLogger("Jest");
    expect(logger.criticalWithMetrics).toBeDefined();
  });

  it("should call logger.critical", () => {
    const logger = new FraudLogger("Jest");
    let criticalMetricsSpy = jest.spyOn(logger.metrics, "addMetric");

    logger.criticalWithMetrics(
      "12345",
      LogEvents.ErrorProcessing,
      "Critical Message"
    );

    expect(criticalSpy).toHaveBeenCalledWith("12345", "Critical Message");
    expect(criticalSpy).toHaveBeenCalledTimes(1);

    expect(criticalMetricsSpy).toHaveBeenCalledWith(
      LogEvents.ErrorProcessing,
      MetricUnits.Count,
      1
    );
    expect(criticalMetricsSpy).toHaveBeenCalledTimes(1);
  });
});
