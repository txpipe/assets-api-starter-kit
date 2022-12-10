import { DBSyncAssetsDataSource } from "../dataSources/assetsDataSource";
import { Asset } from "../models/assetsModel";
import { AssetsService } from "../services/assetsService";

class AssetsController {

  private service: AssetsService;

  constructor(service: AssetsService) {
    this.service = service;
}

  public async getAssets(policyId: string): Promise<Asset[]> {
    return this.service.getAssetsForPolicyId(policyId);
  }
}


export const assetsController = new AssetsController(new AssetsService(new DBSyncAssetsDataSource()));