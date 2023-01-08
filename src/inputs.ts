export enum Inputs {
  Path = 'path',
  ManagementToken = 'management_token',
  ApiKey = 'api_key',
  ParentFolderUid = 'parent_folder_uid'
}

export interface UploadInputs {
  managementToken: string
  apiKey: string
  parentUid: string
  filepath: string
}
