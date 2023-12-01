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

    it("should be defined", () => {
      expect(fraudLogger.logStartedProcessing).toBeDefined();
    });

    it("should call logger.info and metrics.AddMetric", () => {
      jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

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
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

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
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

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
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

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

  describe("logJWSSignSuccess", () => {
    it("should be defined", async () => {
      expect(fraudLogger.logJWSSignSuccess).toBeDefined();
    });

    it("should call logger.info", () => {
      jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
      jest
        .spyOn(fraudLogger.metrics, "addMetric")
        .mockImplementation(() => null);

      fraudLogger.logJWSSignSuccess("jwsContentHere", "messageID");

      expect(fraudLogger.logger.info).toHaveBeenCalledWith(
        LogEvents.JWSSignSuccess,
        { jws: "jwsContentHere" },
        { messageId: "messageID" }
      );
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

    describe("logSETBatchGeneration", () => {
      it("should be defined", async () => {
        expect(fraudLogger.logSETBatchGeneration).toBeDefined();
      });

      it("should call logger.info", () => {
        jest.spyOn(fraudLogger.logger, "info").mockImplementation(() => null);
        jest
          .spyOn(fraudLogger.metrics, "addMetric")
          .mockImplementation(() => null);

        fraudLogger.logSETBatchGeneration([
          LogEvents.PartialSETBatchGenerated,
          ["messageId1", "messageId2"],
          ["batchId1", "batchId2"],
        ]);

        expect(fraudLogger.logger.info).toHaveBeenCalledWith(
          LogEvents.PartialSETBatchGenerated,
          { successfulMessageIds: ["messageId1", "messageId2"] },
          { failedMessageIds: ["batchId1", "batchId2"] }
        );
      });
    });
  });
});
