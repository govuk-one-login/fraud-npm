export enum LogEvents {
  StartedProcessing = "Started Processing",
  SuccessfullyProcessed = "Successfully Processed",
  ErrorProcessing = "Error Processing",
  JWEDecryptSuccess = "Successfully decrypted JWE",
  JWSVerifySuccess = "Successfully verified JWS",
  FullSQSBatchGenerated = "Successfully sent all SQS Batch messages",
  PartialSQSBatchGenerated = "Failed to send some attempted SQS Batch messages",
  FailedSQSBatchGenerated = "Failed to send all attempted SQS Batch messages",
  FailedToValidateRecord = "Failed to Validate Record",
  FailedToRemapRecord = "Failed to Remap Record",
  FailedToReformatRecord = "Failed to Reformat Record",
  FullSETBatchGenerated = "SET Batch Generation Succesful",
  FailedSETBatchGenerated = "SET Batch Generation Failed",
  PartialSETBatchGenerated = "SET Batch Generation Partially Successful",
  JWSSignSuccess = "Successfully signed JWS",
  JWEEncryptSuccess = "Successfully encrypted JWE",
  PublicKeyRequested = "Public Key requested",
  PublicKeyReturned = "Public Key returned successfully",
  PublicKeyRequestFail = "Failed to get Public Key",
}