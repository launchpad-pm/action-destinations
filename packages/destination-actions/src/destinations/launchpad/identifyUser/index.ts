import { ActionDefinition, omit } from '@segment/actions-core'
import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'

import { getApiServerUrl, getConcatenatedName } from '../utils'

const identifyUser: ActionDefinition<Settings, Payload> = {
  title: 'Identify User',
  description: 'Set the user ID for a particular device ID or update user properties.',
  defaultSubscription: 'type = "identify"',
  fields: {
    ip: {
      label: 'IP Address',
      type: 'string',
      description: "The IP address of the user. This is only used for geolocation and won't be stored.",
      default: {
        '@path': '$.context.ip'
      }
    },
    user_id: {
      label: 'User ID',
      type: 'string',
      allowNull: true,
      description: 'The unique user identifier set by you',
      default: {
        '@path': '$.userId'
      }
    },
    anonymous_id: {
      label: 'Anonymous ID',
      type: 'string',
      allowNull: true,
      description: 'The generated anonymous ID for the user',
      default: {
        '@path': '$.anonymousId'
      }
    },
    traits: {
      label: 'User Properties',
      type: 'object',
      description: 'Properties to set on the user profile',
      default: {
        '@path': '$.traits'
      }
    }
  },

  perform: async (request, { payload, settings }) => {
    const apiServerUrl = getApiServerUrl(settings.apiRegion)

    const responses = []
    if (payload.anonymous_id) {
      const identifyEvent = {
        event: '$identify',
        properties: {
          $identified_id: payload.user_id,
          $anon_id: payload.anonymous_id,
          segment_source_name: settings.sourceName
        }
      }

      const identifyResponse = await request(`${apiServerUrl}`, {
        method: 'post',
        body: new URLSearchParams({ data: JSON.stringify(identifyEvent) })
      })
      responses.push(identifyResponse)
    }

    if (payload.traits && Object.keys(payload.traits).length > 0) {
      const concatenatedName = getConcatenatedName(
        payload.traits.firstName,
        payload.traits.lastName,
        payload.traits.name
      )
      const traits = {
        ...omit(payload.traits, ['created', 'email', 'firstName', 'lastName', 'name', 'username', 'phone']),
        // to fit the Launchpad expectations, transform the special traits to Launchpad reserved property
        $created: payload.traits.created,
        $email: payload.traits.email,
        $first_name: payload.traits.firstName,
        $last_name: payload.traits.lastName,
        $name: concatenatedName,
        $username: payload.traits.username,
        $phone: payload.traits.phone
      }
      const data = {
        $distinct_id: payload.user_id,
        $ip: payload.ip,
        $set: traits
      }

      const engageResponse = request(`${apiServerUrl}/engage`, {
        method: 'post',
        body: new URLSearchParams({ data: JSON.stringify(data) })
      })
      responses.push(engageResponse)
    }
    return Promise.all(responses)
  }
}

export default identifyUser
