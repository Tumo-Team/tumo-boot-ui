import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/@/utils/http/axios/types';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

export const Api = {
  PutFile: `${uploadUrl}/put`,
};

export function uploadListApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  return defHttp.uploadFile(
    {
      url: Api.PutFile,
      onUploadProgress,
    },
    params
  );
}
