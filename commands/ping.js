const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong...'),
	async execute(client, interaction) {
		return interaction.reply({content:`Pong! :ping_pong: I am working.`, ephemeral:true})
	},
};

