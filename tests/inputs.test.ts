import path from 'path'
import { getInputs } from '../src/input-helper'

const mockInput = {
  path: 'path',
  management_token: 'management_token',
  api_key: 'api_key',
  folder_uid: 'folder_uid',
  file_path: path.join('./', 'action.yml'),
  host_url: 'https://api.contentstack.io/v3/assets'
}

jest.mock('@actions/core', () => ({
  getInput: (key: string) => mockInput[key]
}))

test('get all the inputs', () => {
  expect(getInputs()).toStrictEqual({
    managementToken: 'management_token',
    apiKey: 'api_key',
    folderUid: 'folder_uid',
    filePath: path.join('./', 'action.yml'),
    hostUrl: 'https://api.contentstack.io/v3/assets'
  })
})
