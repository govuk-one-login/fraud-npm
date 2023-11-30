import { Logger } from "@aws-lambda-powertools/logger";
import { LogEvents } from "./log-events";
import { MetricUnits, Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";

export const fraudTracer = new Tracer();

export class FraudLogger {
  constructor(
    public logger: Logger,
    public metrics: Metrics,
    public environment?: string
  ) {
    if (environment === "development") this.logger.setLogLevel("DEBUG");
  }

  /**
   * Send Started Processing Event log
   *
   * @param messageId
   */
  logStartedProcessing = (messageId?: string): void => {
    this.logger.info(LogEvents.StartedProcessing, { messageId });
    this.metrics.addMetric(LogEvents.StartedProcessing, MetricUnits.Count, 1);
  };

  /**
   *  Send Successfully Processed Event log
   *
   * @param previousMessageId
   * @param newMessageId
   */
  logSuccessfullyProcessed = (
    previousMessageId?: string,
    newMessageId?: string
  ): void => {
    this.logger.info(
      LogEvents.SuccessfullyProcessed,
      { previousMessageId },
      { newMessageId }
    );
    this.metrics.addMetric(
      LogEvents.SuccessfullyProcessed,
      MetricUnits.Count,
      1
    );
  };

  /**
   * Send Error Event log
   *
   * @param messageId
   * @param error
   */
  logErrorProcessing = (messageId?: string, error?: any): void => {
    this.logger.error(LogEvents.ErrorProcessing, { messageId }, { error });
    this.metrics.addMetric(LogEvents.ErrorProcessing, MetricUnits.Count, 1);
  };

  /**
   * Send Generic Log Event log
   *
   * @param messageId
   * @param error
   */
  logMessage = (logMessage: string): void => {
    this.logger.info(logMessage);
    this.metrics.addMetric(logMessage, MetricUnits.Count, 1);
  };

  /**
   * Send Generic Debug Log Event log
   *
   * Only when logger level is equal to 'DEBUG'
   *
   * @param message
   */
  logDebug = (message: string): void => {
    if (this.logger.getLevelName() === "DEBUG") {
      this.logger.debug(message);
    }
  };
}
