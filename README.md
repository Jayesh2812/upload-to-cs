# Upload file to ContentStack

This action uploads file at provided path to ContentStack Assets

## Inputs

### `management_token`

**Required** Management Token for the stack authorization.


### `api_key`

**Required** Api Key of the stack.


### `file_path`

**Required** Path of the file to upload


### `folder_uid`

Folder Uid under which file is to be uploaded in ContentStack Assets.

## Outputs

### `link`

Link of the uploaded asset.

## Example usage

```yaml
on: [push]

jobs:
  upload-file:
    runs-on: ubuntu-latest
    name: Upload test report to CS
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "16.x"

      - name: Upload
        id: upload
        uses: Jayesh2812/upload-to-cs@v1.2
        with:
          file_path: test-report/index.html
          management_token: ${{ secrets.MANAGEMENT_TOKEN }}
          api_key: blt123456789
          folder_uid: blt987654321

      - name: Link for Report
        run: echo "${{ steps.upload.outputs.link }}"

```

Referrels:
https://docs.github.com/en/actions/creating-actions/about-custom-actions
https://github.com/actions/upload-artifact