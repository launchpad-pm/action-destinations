// Generated file. DO NOT MODIFY IT BY HAND.

export interface Payload {
  /**
   * The name of the action being performed.
   */
  event: string
  /**
   * A distinct ID randomly generated prior to calling identify.
   */
  anonymousId?: string
  /**
   * The distinct ID after calling identify.
   */
  userId?: string
  /**
   * The unique identifier of the group that performed this event.
   */
  groupId?: string
  /**
   * A random id that is unique to an event. Launchpad uses $insert_id to deduplicate events.
   */
  messageId?: string
  /**
   * The timestamp of the event. Launchpad expects epoch timestamp in millisecond or second. Please note, Launchpad only accepts this field as the timestamp. If the field is empty, it will be set to the time Launchpad servers receive it.
   */
  time?: string | number
  /**
   * The name of the mobile operating system or browser that the user is using.
   */
  os_name?: string
  /**
   * The version of the mobile operating system or browser the user is using.
   */
  os_version?: string
  /**
   * A unique identifier for the device the user is using.
   */
  device_id?: string
  /**
   * The type of the user's device.
   */
  device_type?: string
  /**
   * The name of the user's device.
   */
  device_name?: string
  /**
   * The device manufacturer that the user is using.
   */
  device_manufacturer?: string
  /**
   * The device model that the user is using.
   */
  device_model?: string
  /**
   * The current country of the user.
   */
  country?: string
  /**
   * The current region of the user.
   */
  region?: string
  /**
   * The language set by the user.
   */
  language?: string
  /**
   * The name of the SDK used to send events.
   */
  library_name?: string
  /**
   * The version of the SDK used to send events.
   */
  library_version?: string
  /**
   * The IP address of the user. This is only used for geolocation and won't be stored.
   */
  ip?: string
  /**
   * The full URL of the webpage on which the event is triggered.
   */
  url?: string
  /**
   * Referrer url
   */
  referrer?: string
  /**
   * User agent
   */
  userAgent?: string
  /**
   * An object of key-value pairs that represent additional data to be sent along with the event.
   */
  properties?: {
    [k: string]: unknown
  }
  /**
   * An object of key-value pairs that represent additional data tied to the user.
   */
  traits?: {
    [k: string]: unknown
  }
  /**
   * An object of key-value pairs that provides useful context about the event.
   */
  context?: {
    [k: string]: unknown
  }
  /**
   * UTM Tracking Properties
   */
  utm_properties?: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
  }
  /**
   * Set as true to ensure Segment sends data to Launchpad in batches.
   */
  enable_batching?: boolean
}
