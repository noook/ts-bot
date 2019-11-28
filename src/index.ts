import 'module-alias/register';
import 'dotenv/config';
import "reflect-metadata";
import { shuffle } from '@/utils'; // @ is an alias to src

console.clear();

const arr: number[] = [...Array(10)].map((_, i: number) => i + 1);
const shuffled: number[] = shuffle(arr);
console.log(shuffled);
