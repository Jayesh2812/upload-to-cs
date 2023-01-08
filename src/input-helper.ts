import * as core from '@actions/core'
import path from 'path'
import { Inputs, UploadInputs } from './inputs'

export function getInputs() {
  const managementToken = core.getInput(Inputs.ManagementToken, {
    required: true
  })

  const apiKey = core.getInput(Inputs.ApiKey, {
    required: true
  })

  const folderPath = core.getInput(Inputs.Path, {
    required: true
  })

  const parentUid = core.getInput(Inputs.ParentFolderUid)

  const filename = 'index.html'

  const filepath = path.join(folderPath, filename)

  const inputs = {
    managementToken,
    apiKey,
    parentUid,
    filepath
  } as UploadInputs

  return inputs
}
