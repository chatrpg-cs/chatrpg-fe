import LogitBias from '@/types/chconf/LogitBias';

export default interface ModelSettings {
    id?: string;
    modelName?: string;
    maxTokens?: number;
    chatHistoryMemory?: number;
    temperature?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    stopSequence?: string[];
    logitBias?: LogitBias[];
}
