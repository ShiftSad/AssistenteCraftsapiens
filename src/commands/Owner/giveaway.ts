import Command from "../../structures/Command";
import Client from "../../structures/Client";

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
                    type: 1
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
                }
            ]
        })
    }
}