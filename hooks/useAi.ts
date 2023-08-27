import { z } from "zod";

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";

import "dotenv/config";

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY!,
  modelName: "gpt4",
  temperature: 0.6,
  maxRetries: 3,
  maxTokens: 2000,
});

const explanationParser = z.object({
  explanation: z.string().describe("The explanation for the move"),
  winProbability: z
    .number()
    .optional()
    .describe("The probability of winning after the move"),
});

const chessParser = StructuredOutputParser.fromZodSchema(
  explanationParser.merge(
    z.object({
      square: z.string().describe("The square to move the piece to"),
      from: z.string().describe("The square to move the piece from"),
    })
  )
);

type ChessParserResponseType = z.infer<typeof chessParser.schema>;

export type MoveParserResponseType = ChessParserResponseType;

export async function playChess(
  board: string,
  playerColor: string
): Promise<ChessParserResponseType> {
  const format = chessParser.getFormatInstructions();

  const gameMasterTemplate = `
  As a seasoned coach with a profound understanding of chess, your mission is to scrutinize the present situation on the board and devise the most advantageous next move for your student.
  At this moment, your student is engaged in the battle as the {playerColor} player, and it's their opportunity to make a move.
  Your responsibility is to identify the most optimal move for them to execute on this turn.
  Your advice should remain succinct and only focus on the end goal: The intended position of the chess piece on the board.
  To illustrate, if the game in question is chess, the output should solely specify the targeted square to which the chess piece should be relocated. 
  For instance, if the most strategic square is e4, the output should simply read 'e4'.
  Avoid including any other specifics about the chess piece involved.
  To facilitate your strategy planning, here is a representation of the current state of the game board: {board}.
  Once you've determined the best course of action, kindly provide an explanation highlighting the rationale behind your chosen move. 
  This will offer valuable insights to your student about the decision-making process in chess, fostering their strategic thinking skills.
  Please make sure that your response is in line with these guidelines: {formatInstruction}.
  `;

  const template = new PromptTemplate({
    template: gameMasterTemplate,
    inputVariables: ["playerColor", "board"],
    partialVariables: { formatInstruction: format },
  });

  const input = await template.format({
    playerColor,
    board,
  });

  console.log("Making request to OpenAI API with prompt: \n\n", input);
  console.log(`\nAI is thinking...`);
  const start = performance.now();
  const response = await model.call(input);

  try {
    const data = await chessParser.parse(response);
    const end = performance.now();
    const time = Math.round((end - start) / 1000);
    console.log(`AI took ${time}s seconds to generate.`);
    return data;
  } catch (error) {
    console.error("Failed to parse bad output: ", error);
    const fixParser = OutputFixingParser.fromLLM(model, chessParser);
    const output = await fixParser.parse(response);
    console.log("Fixed output: ", output);
    return output;
  }
}
