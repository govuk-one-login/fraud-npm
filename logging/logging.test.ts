import { Metrics } from "@aws-lambda-powertools/metrics";
import { LogEvents } from "./log-events";
import { FraudLogger } from "./logging";
import { Logger } from "@aws-lambda-powertools/logger";

const fraudLogger = new FraudLogger(new Logger(), new Metrics());

describe("logStartedProcessing", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(fraudLogger.logStartedProcessing).toBeDefined();
  });

  it("should call logger.info and metrics.AddMetric", () => {
    jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
    jest.spyOn(fraudLogger.metrics, "addMetric").mockImplementation(() => null);

    fraudLogger.logStartedProcessing("12345");

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

  it("should be defined", async () => {
    expect(fraudLogger.logSuccessfullyProcessed).toBeDefined();
  });

  it("should call logger.info", () => {
    jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
    jest.spyOn(fraudLogger.metrics, "addMetric").mockImplementation(() => null);

    fraudLogger.logSuccessfullyProcessed("12345", "678910");

    expect(fraudLogger.logger.info).toHaveBeenCalledWith(
      LogEvents.SuccessfullyProcessed,
      { previousMessageId: "12345" },
      { newMessageId: "678910" }
    );
  });
});

describe("logJWSVerifySuccess", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", async () => {
    expect(fraudLogger.logJWSVerifySuccess).toBeDefined();
  });

  it("should call logger.info", () => {
    jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
    jest.spyOn(fraudLogger.metrics, "addMetric").mockImplementation(() => null);

    fraudLogger.logJWSVerifySuccess("testID");

    expect(fraudLogger.logger.info).toHaveBeenCalledWith(
      LogEvents.JWSVerifySuccess,
      { messageId: "testID" }
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
    jest.spyOn(fraudLogger.metrics, "addMetric").mockImplementation(() => null);

    fraudLogger.logErrorProcessing("12345", "Error Message");

    expect(fraudLogger.logger.error).toHaveBeenCalledWith(
      LogEvents.ErrorProcessing,
      { messageId: "12345" },
      { error: "Error Message" }
    );
  });
});

describe("logSETBatchProcess", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", async () => {
    expect(fraudLogger.logSETBatchProcess).toBeDefined();
  });

  it("should call logger.info", () => {
    const logEventsValue: LogEvents = LogEvents.FullSQSBatchGenerated;
    const successfulMessageIds: string[] = ["id1", "id2"];
    const failedMessageIds: string[] = ["id3", "id4"];

    jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
    jest.spyOn(fraudLogger.metrics, "addMetric").mockImplementation(() => null);

    fraudLogger.logSETBatchProcess([
      logEventsValue,
      successfulMessageIds,
      failedMessageIds,
    ]);

    expect(fraudLogger.logger.info).toHaveBeenCalledWith(
      logEventsValue,
      { successfulMessageIds },
      { failedMessageIds }
    );
  });

  describe("logFailedMessageProcessing", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should be defined", async () => {
      expect(fraudLogger.logFailedMessageProcessing).toBeDefined();
    });

    it("should call logger.info", () => {
      const logEventsValue: LogEvents = LogEvents.FailedSQSBatchGenerated;
      const failedMessageIds = [
        { itemIdentifier: "id3" },
        { itemIdentifier: "id4" },
      ];

      jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

      fraudLogger.logFailedMessageProcessing([
        logEventsValue,
        failedMessageIds,
      ]);

      expect(fraudLogger.logger.info).toHaveBeenCalledWith(logEventsValue, {
        failedMessageIds,
      });
    });
  });
});
