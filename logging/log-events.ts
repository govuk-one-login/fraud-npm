export enum LogEvents {
  StartedProcessing = 'Started Processing',
  SuccessfullyProcessed = 'Successfully Processed',
  ErrorProcessing = 'Error Processing',
  JWSVerifySuccess = 'Successfully verified JWS',
  FullSQSBatchGenerated = 'Successfully sent all SQS Batch messages',
  PartialSQSBatchGenerated = 'Partially sent all SQS Batch messages',
  FailedSQSBatchGenerated = 'Failed to send all attempted SQS Batch messages',
  FullSETBatchGenerated = 'SET Batch Generation Successful',
  PartialSETBatchGenerated = 'SET Batch Generation Partially Successful',
  FailedSETBatchGenerated = 'SET Batch Generation Failed',
  JWSSignSuccess = 'Successfully signed JWS',
  BackstopItemCreated = "Created BACKSTOP item",
  RpExcluded = "Excluded subject from processing as it is from a test RP"
}
