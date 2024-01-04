// https://github.com/mongodb/js-bson/blob/c307ca8e81b73ccfcac0b54e5012123773d30ddb/lib/objectid.js#L12
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
export function isObjectId(target) {
  return checkForHexRegExp.test(target);
}

export type GetIdInput = { _id: any } | { id: any } | string | Buffer | any;

function is_id(target): target is { _id: any } {
  return !!target?._id;
}

function isid(target): target is { id: any } {
  return !!target?.id;
}
// get objectId string

/**
 * Returns the objectId string from a variety of input types, including strings, objects with "_id" or "id" properties, and Buffers.
 *
 * @param {@link GetIdInput} target - The input to extract the objectId string from.
 * @returns {string|null} The objectId string, or null if the input is invalid or does not contain an objectId string.
 */
export function getId(target: GetIdInput) {
  let value = is_id(target) ? target._id : isid(target) ? target.id : target;
  if (typeof Buffer !== 'undefined') {
    value = value instanceof Buffer ? value.toString('hex') : value;
  }
  const id = isObjectId(String(value)) ? String(value) : null;

  return id;
}

// get objectIds
export function getIdList(target) {
  return target?.map?.(getId).filter((t) => !!t) || [];
}
