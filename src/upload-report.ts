import core from '@actions/core'
import FormData from 'form-data'
import fs from 'fs'
import axios from 'axios'

import { getInputs } from './input-helper'
import { UploadInputs } from './inputs'

// TODO: Add region support
// TODO: Add test cases.
// API apiKey
// MANAGEMENT TOKEN
// parent folder uid
// region

try {
  const { managementToken, apiKey, parentUid, filepath } = getInputs()
  postReport({ managementToken, apiKey, parentUid, filepath })
} catch (error) {
  core.setFailed((error as Error).message)
}

async function postReport({
  managementToken,
  apiKey,
  parentUid,
  filepath
}: UploadInputs) {
  var data = new FormData()
  data.append('asset[upload]', fs.createReadStream(filepath))
  data.append('asset[parent_uid]', parentUid)

  var config = {
    method: 'post',
    url: 'https://api.contentstack.io/v3/assets',
    headers: {
      api_key: apiKey,
      authorization: managementToken,
      'Content-Type': 'multipart/form-data',
      ...data.getHeaders()
    },
    data: data
  }

  axios(config)
    .then(function (response) {
      const url = response.data.asset.url
      core.setOutput('link', url)
    })
    .catch(function (error) {
      core.setFailed(error.response.data)
      console.log(error.response.data)
    })
}
