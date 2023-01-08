# Upload to CS Action

This action uploads index.html file to ContentStack Assets at the provided directory.

## Inputs

### `management_token`

**Required** Management Token for the stack authorization.


### `api_key`

**Required** Api Key of the stack.


### `path`

**Required** Path to the folder inside which an index.html resides (Ex. test-report directory ).


### `parent_folder_uid`

Parent folder UID under which an asset should be uploaded.

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
          path: test-report/
          management_token: ${{ secrets.MANAGEMENT_TOKEN }}
          api_key: blt123456789
          parent_folder_uid: blt987654321

      - name: Link for Report
        run: echo "${{ steps.upload.outputs.link }}"

```