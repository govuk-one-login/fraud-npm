import { Logger } from "@aws-lambda-powertools/logger";
import { LogEvents } from "./log-events";
import { MetricUnits, Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { LogItemExtraInput } from "@aws-lambda-powertools/logger/lib/types";

export const fraudTracer = new Tracer();

export class FraudLogger extends Logger {
  public metrics: Metrics;
  constructor(serviceName: string, namespace?: string) {
    super();
    this.metrics = new Metrics({
      serviceName: serviceName,
      namespace: namespace,
    });
  }

  infoWithMetrics = (input: string, metric: LogEvents, ...extraInput: LogItemExtraInput): void => {
    super.info(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnits.Count, 1);
  }
  errorWithMetrics = (input: string, metric: LogEvents, ...extraInput: LogItemExtraInput): void => {
    super.error(input, ...extraInput);
    this.metrics.addMetric(metric, MetricUnits.Count, 1);
  }
}
