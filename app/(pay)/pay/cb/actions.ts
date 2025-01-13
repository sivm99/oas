// verify the payment and then call my backend using this function
function getOASHash(subscriptionId, mobile, gateway) {
  const salt = process.env.OAS_SALT;
  const verifyStr = `${subscriptionId}-${mobile}-${gateway}`;
  const hash = crypto
    .createHash("sha256")
    .update(verifyStr + salt)
    .digest("hex");
  return hash;
}

function verifyOASSignature(subscriptionId, mobile, gateway, oasVerify) {
  const expectedHash = getOASHash(subscriptionId, mobile, gateway);
  return oasVerify.toLowerCase() === expectedHash.toLowerCase();
}
