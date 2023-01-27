import type { Settings } from '../generated-types'
import type { Payload } from './generated-types'
import dayjs from '../../../lib/dayjs'
import { LaunchpadEventProperties } from '../launchpad-types'
import { getBrowser, getBrowserVersion, cheapGuid } from '../utils'

// const LaunchpadReservedProperties = ['time', 'id', 'anon_id', 'distinct_id', '$group_id', '$insert_id', '$user_id'] // NOTE: NEED TO VALIDATE THIS

export function getEventProperties(payload: Payload, settings: Settings): LaunchpadEventProperties {
  const datetime = payload.timestamp
  const time = datetime && dayjs.utc(datetime).isValid() ? dayjs.utc(datetime).valueOf() : Date.now()

  let browser, browserVersion
  if (payload.userAgent) {
    browser = getBrowser(payload.userAgent, payload.context?.manufacturer)
    browserVersion = getBrowserVersion(payload.userAgent, payload.context?.manufacturer)
  }

  const integration = payload.context?.integration as Record<string, string>
  return {
    time: time,
    ip: payload.context?.ip,
    id: payload.event,
    anonymous_id: payload.anonymousId,
    distinct_id: payload.userId ? payload.userId : payload.anonymousId,
    context: payload.context,
    browser: browser,
    browser_version: browserVersion,
    current_url: payload.url,
    group_id: payload.groupId,
    identified_id: payload.userId,
    properties: payload.properties,
    traits: payload.traits,
    messageId: payload.messageId ?? cheapGuid(),
    referrer: payload.referrer,
    source: integration?.name == 'Iterable' ? 'Iterable' : 'segment',
    user_id: payload.userId,
    segment_source_name: settings.sourceName
  }
}
