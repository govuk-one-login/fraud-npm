export enum LogEvents {
  StartedProcessing = 'Started Processing',
  SuccessfullyProcessed = 'Successfully Processed',
  ErrorProcessing = 'Error Processing',
  JWSVerifySuccess = 'Successfully verified JWS',
  FullSQSBatchGenerated = 'Successfully sent all SQS Batch messages',
  FailedSQSBatchGenerated = 'Failed to send all attempted SQS Batch messages',
  PartialSETBatchGenerated = 'SET Batch Generation Partially Successful',
  JWSSignSuccess = 'Successfully signed JWS',
}
