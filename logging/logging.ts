import { Logger } from "@aws-lambda-powertools/logger";
import { LogEvents } from "./log-events";
import { MetricUnits, Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";

export const fraudTracer = new Tracer();

export class FraudLogger extends Logger {
  public metrics: Metrics;
  constructor(serviceName?: string, namespace?: string) {
    super();
    this.metrics = new Metrics({
      serviceName: serviceName,
      namespace: namespace,
    });
  }

  /**
   *  Send Event Processed Event log
   *
   * @param previousMessageId
   * @param newMessageId
   */
  logEventProcessed = (
    logEvent: string,
    previousMessageId?: string,
    newMessageId?: string
  ): void => {
    super.info(logEvent, { previousMessageId }, { newMessageId });
    this.metrics.addMetric(logEvent, MetricUnits.Count, 1);
  };

  /**
   * Send Error Event log
   *
   * @param messageId
   * @param error
   */
  logErrorProcessing = (messageId?: string, error?: any): void => {
    super.error(LogEvents.ErrorProcessing, { messageId }, { error });
    this.metrics.addMetric(LogEvents.ErrorProcessing, MetricUnits.Count, 1);
  };

  /**
   * Send Generic Log Event log
   *
   * @param messageId
   * @param error
   */
  logMessage = (logMessage: string, messageId?: string): void => {
    super.info(logMessage, { messageId });
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
    if (super.getLevelName() === "DEBUG") {
      super.debug(message);
    }
  };
}
