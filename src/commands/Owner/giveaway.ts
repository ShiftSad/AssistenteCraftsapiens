import Command from "../../structures/Command";
import Client from "../../structures/Client";
import CommandContext from "../../structures/CommandContext";
import { TextableChannel, User } from "oceanic.js";

export default class giveawayClass extends Command {
    constructor(client: Client) {
        super(client, {
            name: "giveaway",
            description: "Inicia um sorteio",
            category: "DG",
            aliases: ["sorteio"],
            options: [
                {
                    name: "setup",
                    description: "Configura o sorteio",
                    type: 1,
                    options: [
                        {
                            name: "prize",
                            description: "Qual o prêmio do sorteio?",
                            type: 3, // STRING
                            required: true
                        },
                        {
                            name: "channel",
                            description: "Canal do sorteio",
                            type: 7, // CHANNEL
                            required: true
                        },
                        {
                            name: "description",
                            description: "Descrição do prêmio",
                            type: 3, // STRING
                            required: true
                        },
                        {
                            name: "winners",
                            description: "Número de vencedores",
                            type: 4, // INTEGER
                            required: true
                        },
                        {
                            name: "start_time",
                            description: "Data/hora de início (AAAA-MM-DD HH:MM)",
                            type: 3, // STRING
                            required: true
                        },
                        {
                            name: "end_time",
                            description: "Data/hora de término (AAAA-MM-DD HH:MM)",
                            type: 3, // STRING
                            required: true
                        }
                    ]
                },
                {
                    name: "end",
                    description: "Finaliza o sorteio",
                    type: 1,
                    options: [
                        {
                            type: 3,
                            name: "message_id",
                            description: "ID da mensagem do sorteio",
                            required: true
                        }
                    ]
                },
                {
                    name: "reroll",
                    description: "Sorteia novamente",
                    type: 1,
                    options: [
                        {
                            type: 3,
                            name: "message_id",
                            description: "ID da mensagem do sorteio",
                            required: true
                        }
                    ]
                },
                {
                    name: "delete",
                    description: "Deleta um sorteio",
                    type: 1,
                    options: [
                        {
                            type: 3,
                            name: "message_id",
                            description: "ID da mensagem do sorteio",
                            required: true
                        }
                    ]
                },
                {
                    name: "list",
                    description: "Lista os sorteios",
                    type: 1
                },
                {
                    name: "edit",
                    description: "Edita um sorteio",
                    type: 1,
                    options: [
                        {
                            type: 3,
                            name: "message_id",
                            description: "ID da mensagem do sorteio",
                            required: true
                        }
                    ]
                }
            ]
        })
    }

    async execute(ctx: CommandContext): Promise<void> {        
        if (!this.client.allowedUsers.includes(ctx.author.id)) {
			ctx.sendMessage({
				content: "Você não tem acesso a esse comando!",
				flags: 1 << 6
			});
			return;
		}

        const db = await this.client.db.global.findOne({ id: ctx.guild.id });
		if (!db) return;

        const action = ctx.args[0];
        const message_id = ctx.args[1];

        switch (action) {
            case "setup":
                this.setupGiveaway(this.client, message_id, ctx);
                break;
            case "end":
                this.endGiveaway(this.client, message_id, ctx);
                break;
            case "reroll":
                this.rerollGiveaway(this.client, message_id, ctx);
                break;
            case "delete":
                this.deleteGiveaway(this.client, message_id, ctx);
                break;
        }
    }

    async setupGiveaway(client: Client, message_id: string, ctx: CommandContext) {
        const prize = ctx.args[0];
        const description = ctx.args[2];

        const channel_ctx = ctx.args[1];
        const winners_ctx = ctx.args[3];
        const start_time_ctx = ctx.args[4];
        const end_time_ctx = ctx.args[5];

        const channel = client.getChannel(channel_ctx) as TextableChannel;
        const winners = parseInt(winners_ctx);
        const start_time = new Date(start_time_ctx);
        const end_time = new Date(end_time_ctx);
        
        if (isNaN(start_time.getTime()) || isNaN(end_time.getTime())) {
            return ctx.sendMessage("Datas inválidas! Use o formato: AAAA-MM-DD HH:MM");
        }''

        if (!channel || !("createMessage" in channel)) {
            return ctx.sendMessage("O canal fornecido não é válido!");
        }

        const giveawayMessage = await channel.createMessage({
            content: `🎁 **${prize}**\n\n${description}\n\n🎉 **Vencedores:** ${winnersCount}\n🕒 Termina em: **${endTime.toLocaleString()}**`,
            components: [
                {
                    type: 1, // Action Row
                    components: [
                        {
                            type: 2, // Button
                            style: 3, // Success (green)
                            label: "Participar",
                            customID: `giveaway_participate_${message_id}`,
                            emoji: { name: "✅" }
                        },
                        {
                            type: 2, // Button
                            style: 1, // Primary (blue)
                            label: "Participantes",
                            customID: `giveaway_participants_${message_id}`,
                            emoji: { name: "👥" }
                        }
                    ]
                }
            ]
        });

        // Salva o sorteio no banco de dados
        const Giveaway = client.db.giveaway;
        await Giveaway.create({
            guildId: ctx.guild.id,
            channelId: channel.id,
            messageId: giveawayMessage.id,
            prize,
            prizeDescription: description,
            winners,
            start_time,
            end_time,
            participants: [] // Inicialmente vazio
        });
        
        ctx.sendMessage("Sorteio criado com sucesso! 🎁")
    }

    async endGiveaway(client: Client, message_id: string, ctx: CommandContext) {
    
    }

    async rerollGiveaway(client: Client, message_id: string, ctx: CommandContext) {
    
    }

    async deleteGiveaway(client: Client, message_id: string, ctx: CommandContext) {
    
    }
}