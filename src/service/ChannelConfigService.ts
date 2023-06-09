import store from '@/resources/store';
import webclient from '@/resources/webclient';
import ChannelConfiguration from '@/types/chconf/ChannelConfiguration';

const { authData } = store.getters;
const baseUrl = import.meta.env.VITE_CHATRPG_API_BASEURL;

class ChannelConfigService {
    async getAllChannelConfigs(requesterUserId: string): Promise<ChannelConfiguration[]> {
        try {
            const response: any = await webclient(`${baseUrl}/channel-config`, {
                method: 'GET',
                headers: {
                    requester: requesterUserId,
                    Authorization: `Bearer ${authData.access_token}`
                }
            });

            return await response.channel_configs;
        } catch (error: any) {
            console.error(`Error retrieving channel config data -> ${error}`);
            throw error;
        }
    }

    async createChannelConfig(channelConfig: ChannelConfiguration, requesterUserId: string): Promise<ChannelConfiguration> {
        try {
            const response: any = await webclient(`${baseUrl}/channel-config`, {
                method: 'POST',
                data: {
                    id: channelConfig.id,
                    name: channelConfig.name,
                    owner: channelConfig.owner,
                    persona: {
                        id: channelConfig.persona?.id
                    },
                    world: {
                        id: channelConfig.world?.id
                    },
                    moderation_settings: {
                        id: channelConfig.moderationSettings?.id
                    },
                    model_settings: channelConfig.modelSettings
                },
                headers: {
                    requester: requesterUserId,
                    Authorization: `Bearer ${authData.access_token}`
                }
            });

            return response.channel_config;
        } catch (error: any) {
            console.error(`Error creating channel config -> ${error}`);
            throw error;
        }
    }

    async updateChannelConfig(channelConfig: ChannelConfiguration, requesterUserId: string): Promise<ChannelConfiguration> {
        try {
            const response: any = await webclient(`${baseUrl}/channel-config/${channelConfig.id}`, {
                method: 'PUT',
                data: {
                    id: channelConfig.id,
                    name: channelConfig.name,
                    owner: channelConfig.owner,
                    persona: {
                        id: channelConfig.persona?.id
                    },
                    world: {
                        id: channelConfig.world?.id
                    },
                    moderation_settings: {
                        id: channelConfig.moderationSettings?.id
                    },
                    model_settings: channelConfig.modelSettings
                },
                headers: {
                    requester: requesterUserId,
                    Authorization: `Bearer ${authData.access_token}`
                }
            });

            return await response;
        } catch (error: any) {
            console.error(`Error updating channel config with id ${channelConfig.id} -> ${error}`);
            throw error;
        }
    }

    async deleteChannelConfig(channelConfig: ChannelConfiguration, requesterUserId: string): Promise<void> {
        try {
            await webclient(`${baseUrl}/channel-config/${channelConfig.id}`, {
                method: 'DELETE',
                headers: {
                    requester: requesterUserId,
                    Authorization: `Bearer ${authData.access_token}`
                }
            });
        } catch (error: any) {
            console.error(`Error deleting channel config with id ${channelConfig.id} -> ${error}`);
            throw error;
        }
    }
}

export default new ChannelConfigService();