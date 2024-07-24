import { PrismaClient, multi_asset } from "@prisma/client";
import { Asset } from "../models/assetsModel";

export interface AssetsDataSource {
    getForPolicyId(policyId: string): Promise<Asset[]>;
}

function mapAsset(record: multi_asset): Asset {
    return {
        id: record.id.toString(),
        fingerprint: record.fingerprint,
        name: record.name.toString(),
        policyId: record.policy.toString('hex'),
        quantity: 0,
    }
}

export class DBSyncAssetsDataSource implements AssetsDataSource {

    private client: PrismaClient;

    constructor() {
        this.client = new PrismaClient()
    }
    
    async getForPolicyId(policyId: string): Promise<Asset[]> {
        const multiAssets = await this.client.multi_asset.findMany({
            where: {
                policy: Buffer.from(policyId, 'hex'),
            }
        });
        return multiAssets.map((m) => {
            const asset = mapAsset(m);
            return asset;
        });
    }
}

export class MockAssetsDataSource implements AssetsDataSource {
    async getForPolicyId(policyId: string): Promise<Asset[]> {
        return [{
            id: 'asset-id-1',
            name: 'asset-name-1',
            policyId,
            fingerprint: 'asset-fingerprint-1',
            quantity: 100
        },
        {
            id: 'asset-id-2',
            name: 'asset-name-2',
            policyId,
            fingerprint: 'asset-fingerprint-2',
            quantity: 100
        }];
    }
}