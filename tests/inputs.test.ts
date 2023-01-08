import path from 'path'
import { getInputs } from '../src/input-helper'

const data = {
  path: 'path',
  management_token: 'management_token',
  api_key: 'api_key',
  parent_folder_uid: 'parent_folder_uid'
}

jest.mock('@actions/core', () => ({
  getInput: (key: string) => data[key]
}))

test('get all the inputs', () => {
  expect(getInputs()).toStrictEqual({
    managementToken: 'management_token',
    apiKey: 'api_key',
    parentUid: 'parent_folder_uid',
    filepath: path.join('path', 'index.html')
  })
})
