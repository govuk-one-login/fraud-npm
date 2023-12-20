export interface JsonMockSET {
  // Required by inbound-ssf
  iss: string; // Issuer: A string identifying the issuer of the SET, ie. the RP. It is also going to be the endpoint from which the RPs public key can be obtained.
  jti: string; // A unique identifier for the SET. May be used by clients to check if a SET has already been received.
  iat: number; // Issued At Time: The issued at claim contains a value representing when the SET was issued
  aud: string; // The audience ID for the SET, as far as we are concerned in shared signals this should be our ID. If not we drop the message.
  sub: string; // Subject: A sting or URI value that represents the subject of the SET. This will also be supplied in the event payload. For One Login users this would contain the 'RP pairwise Identifier' for said user <- Different for each user of the rp. // iss_sub is the value used to look up each user in our table.
  events: string; // A set of event statements describing a single logical event that has occured about a security subject.

  // Optional to inbound-ssf
  txn?: string; // Transaction ID: A OneLogin defined field used as a way to group multiple events that refer to the same incident
  toe?: number; // This is the time the event occured.

  // Part of the standard but likely not to be used in our ssf
  exp?: number; // This is the time after which the JWT should not be accepted for processing. While the SET specification suggests this doesn't have a use when discussing events that have already occurred, this will allow us to communicate how long documents shared are available for. So this field will only be populated in the outbound and inbound "document shared" events/notifications, and should be ignored otherwise.
}
