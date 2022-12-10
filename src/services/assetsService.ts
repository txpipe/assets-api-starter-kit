import { AssetsDataSource } from "../dataSources/assetsDataSource";
import { Asset } from "../models/assetsModel";

export class AssetsService {
    private dataSource: AssetsDataSource;
    
    constructor(dataSource: AssetsDataSource) {
        this.dataSource = dataSource;
    }

    async getAssetsForPolicyId(policyId: string): Promise<Asset[]> {
        return this.dataSource.getForPolicyId(policyId);
    }
}