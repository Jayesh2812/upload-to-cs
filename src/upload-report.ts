import * as core from '@actions/core'
import FormData from 'form-data'
import fs from 'fs'
import axios from 'axios'

import { getInputs } from './input-helper'
import { UploadInputs } from './inputs'

export async function run(): Promise<void> {
  try {
    const { managementToken, apiKey, parentUid, filepath } = getInputs()

    const [link, error] = await postReport({
      managementToken,
      apiKey,
      parentUid,
      filepath
    })

    if (link) core.setOutput('link', link)
    else if (error) {
      if (error.response) throw Error(error.response.data.error_message)
      throw Error(error)
    }
  } catch (error: any) {
    core.setFailed((error as Error).message)
  }
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
  try {
    const response = await axios(config)
    const { url } = response.data.asset
    return [url, null]
  } catch (error: any) {
    return [null, error]
  }
}
