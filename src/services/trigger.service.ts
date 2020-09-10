import { SimpleHttpExtension } from '../extension/http.extension';
import { getConnection } from 'typeorm';
import { Trigger } from '../db/entity/Trigger';
import addSeconds from 'date-fns/addSeconds';
import { values } from 'lodash';

const extension = new SimpleHttpExtension();

async function loadTriggers() {
  // load triggers from database
  let triggers: Array<Trigger> = await getConnection()
    .getRepository(Trigger)
    .createQueryBuilder('trigger')
    // .where('trigger.executeAt < :now', { now: new Date().toISOString() })
    .where('trigger.executeAt < :now', {
      now: addSeconds(new Date(), 10).toISOString(),
    })
    .getMany();

  let queue = triggers.map((trigger: Trigger) => {
    return extension.execute(JSON.parse(trigger.message));
  });

  let results = await Promise.allSettled(queue);

  console.log(
    `execute triggers with ${extension.name}`,
    new Date(),
    results.map((prom) => {
      return prom.status == 'fulfilled' ? prom.value.data : prom.reason;
    })
  );
}

export function initTriggerService() {
  setInterval(loadTriggers, 5000);
}
