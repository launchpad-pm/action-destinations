import { ActionDefinition, RequestClient } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import { LaunchpadEvent } from '../launchpad-types'
import { getApiServerUrl } from '../utils'
import { getEventProperties } from './functions'
import { eventProperties } from './launchpad-properties'

const getEventFromPayload = (payload: Payload, settings: Settings): LaunchpadEvent => {
  const event: LaunchpadEvent = {
    event: payload.event,
    properties: {
      ...getEventProperties(payload, settings)
    },
    api_key: settings.apiSecret
  }
  return event
}

const processData = async (request: RequestClient, settings: Settings, payload: Payload[]) => {
  const events = payload.map((value) => getEventFromPayload(value, settings))

  let urlAddendum: string
  if (payload.length === 1) {
    urlAddendum = 'capture'
  } else {
    urlAddendum = 'batch'
  }
  const requestURL: string = `${getApiServerUrl(settings.apiRegion)}` + urlAddendum

  return request(requestURL, {
    method: 'post',
    json: events
  })
}

const trackEvent: ActionDefinition<Settings, Payload> = {
  title: 'Track Event',
  description: 'Send an event to Launchpad. [Learn more about Events in Launchpad]',
  defaultSubscription: 'type = "track"',
  fields: {
    event: {
      label: 'Event Name',
      type: 'string',
      description: 'The name of the action being performed.',
      required: true,
      default: {
        '@path': '$.event'
      }
    },
    ...eventProperties
  },

  perform: async (request, { settings, payload }) => {
    return processData(request, settings, [payload])
  },
  performBatch: async (request, { settings, payload }) => {
    console.log(payload)
    return processData(request, settings, payload)
  }
}

export default trackEvent
