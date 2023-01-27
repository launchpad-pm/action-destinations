import { InputField } from '@segment/actions-core'

export const eventProperties: Record<string, InputField> = {
  anonymousId: {
    label: 'Anonymous ID',
    type: 'string',
    description: 'A distinct ID randomly generated prior to calling identify.',
    default: {
      '@path': '$.anonymousId'
    }
  },
  userId: {
    label: 'User ID',
    type: 'string',
    description: 'The distinct ID after calling identify.',
    default: {
      '@path': '$.userId'
    }
  },
  groupId: {
    label: 'Group ID',
    type: 'string',
    description: 'The unique identifier of the group that performed this event.',
    default: {
      '@path': '$.context.groupId'
    }
  },
  messageId: {
    label: 'Insert ID',
    type: 'string',
    description: 'A random id that is unique to an event. Launchpad uses $insert_id to deduplicate events.',
    default: {
      '@path': '$.messageId'
    }
  },
  time: {
    label: 'Timestamp',
    type: 'datetime',
    required: false,
    description:
      'The timestamp of the event. Launchpad expects epoch timestamp in millisecond or second. Please note, Launchpad only accepts this field as the timestamp. If the field is empty, it will be set to the time Launchpad servers receive it.',
    default: {
      '@path': '$.timestamp'
    }
  },
  os_name: {
    label: 'OS Name',
    type: 'string',
    description: 'The name of the mobile operating system or browser that the user is using.',
    default: {
      '@path': '$.context.os.name'
    }
  },
  os_version: {
    label: 'OS Version',
    type: 'string',
    description: 'The version of the mobile operating system or browser the user is using.',
    default: {
      '@path': '$.context.os.version'
    }
  },
  device_id: {
    label: 'Device ID',
    type: 'string',
    description: 'A unique identifier for the device the user is using.',
    default: {
      '@path': '$.context.device.id'
    }
  },
  device_type: {
    label: 'Device Type',
    type: 'string',
    description: "The type of the user's device.",
    default: {
      '@path': '$.context.device.type'
    }
  },
  device_name: {
    label: 'Device Name',
    type: 'string',
    description: "The name of the user's device.",
    default: {
      '@path': '$.context.device.name'
    }
  },
  device_manufacturer: {
    label: 'Device Manufacturer',
    type: 'string',
    description: 'The device manufacturer that the user is using.',
    default: {
      '@path': '$.context.device.manufacturer'
    }
  },
  device_model: {
    label: 'Device Model',
    type: 'string',
    description: 'The device model that the user is using.',
    default: {
      '@path': '$.context.device.model'
    }
  },
  country: {
    label: 'Country',
    type: 'string',
    description: 'The current country of the user.',
    default: {
      '@path': '$.context.location.country'
    }
  },
  region: {
    label: 'Region',
    type: 'string',
    description: 'The current region of the user.',
    default: {
      '@path': '$.context.location.region'
    }
  },
  language: {
    label: 'Language',
    type: 'string',
    description: 'The language set by the user.',
    default: {
      '@path': '$.context.locale'
    }
  },
  library_name: {
    label: 'Library Name',
    type: 'string',
    description: 'The name of the SDK used to send events.',
    default: {
      '@path': '$.context.library.name'
    }
  },
  library_version: {
    label: 'Library Version',
    type: 'string',
    description: 'The version of the SDK used to send events.',
    default: {
      '@path': '$.context.library.version'
    }
  },
  ip: {
    label: 'IP Address',
    type: 'string',
    description: "The IP address of the user. This is only used for geolocation and won't be stored.",
    default: {
      '@path': '$.context.ip'
    }
  },
  url: {
    label: 'URL',
    type: 'string',
    description: 'The full URL of the webpage on which the event is triggered.',
    default: {
      '@path': '$.context.page.url'
    }
  },
  referrer: {
    label: 'Referrer',
    type: 'string',
    description: 'Referrer url',
    default: {
      '@path': '$.context.page.referrer'
    }
  },
  userAgent: {
    label: 'User Agent',
    type: 'string',
    description: 'User agent',
    default: {
      '@path': '$.context.userAgent'
    }
  },
  properties: {
    label: 'Event Properties',
    type: 'object',
    description: 'An object of key-value pairs that represent additional data to be sent along with the event.',
    default: {
      '@path': '$.properties'
    }
  },
  traits: {
    label: 'User Properties',
    type: 'object',
    description: 'An object of key-value pairs that represent additional data tied to the user.',
    default: {
      '@path': '$.traits'
    }
  },
  context: {
    label: 'Event context',
    description: 'An object of key-value pairs that provides useful context about the event.',
    type: 'object',
    default: {
      '@path': '$.context'
    }
  },
  utm_properties: {
    label: 'UTM Properties',
    type: 'object',
    description: 'UTM Tracking Properties',
    properties: {
      utm_source: {
        label: 'UTM Source',
        type: 'string'
      },
      utm_medium: {
        label: 'UTM Medium',
        type: 'string'
      },
      utm_campaign: {
        label: 'UTM Campaign',
        type: 'string'
      },
      utm_term: {
        label: 'UTM Term',
        type: 'string'
      },
      utm_content: {
        label: 'UTM Content',
        type: 'string'
      }
    },
    default: {
      utm_source: { '@path': '$.context.campaign.source' },
      utm_medium: { '@path': '$.context.campaign.medium' },
      utm_campaign: { '@path': '$.context.campaign.name' },
      utm_term: { '@path': '$.context.campaign.term' },
      utm_content: { '@path': '$.context.campaign.content' }
    }
  },
  enable_batching: {
    type: 'boolean',
    label: 'Batch Data to Launchpad',
    description: 'Set as true to ensure Segment sends data to Launchpad in batches.',
    default: true
  }
}
