import type { Model } from '../types/models';


export class ModelManager {
    private models: Model[] = [];
    constructor(initialModels: Model[] = []) {
        this.models = initialModels;
    }

    addModel(model: Model): void {
        if (!this.models.find(m => m.id == model.id)) {
            this.models.push(model);
        }
    }

    getModel(id: string): Model | undefined {
        return this.models.find(m => m.id === id);
    }

    getLocalModels(): Model[] {
        return this.models.filter(m => m.provider === 'local');
    }
    getAllModels(): Model[] {
        return [...this.models];
    }


}