export enum LogEvents {
    StartedProcessing = 'Started Processing',
    SuccessfullyProcessed = 'Successfully Processed',
    ErrorProcessing = 'Error Processing',
    JWEDecryptSuccess = 'Successfully decrypted JWE',
    JWSVerifySuccess = 'Successfully verified JWS',
    FullSETBatchGenerated = 'Full SET Batch Generated',
    PartialSETBatchGenerated = 'Partial SET Batch Generated',
    FailedSETBatchGenerated = 'Failed SET Batch Generated',
    FailedToValidateRecord = 'Failed to Validate Record',
    FailedToRemapRecord = 'Failed to Remap Record',
    FailedToReformatRecord = 'Failed to Reformat Record',
  }