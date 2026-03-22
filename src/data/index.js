import ch01 from './chapters/ch01.js';
import ch02 from './chapters/ch02.js';
import ch03 from './chapters/ch03.js';
import ch04 from './chapters/ch04.js';
import ch05 from './chapters/ch05.js';
import ch06 from './chapters/ch06.js';
import ch07 from './chapters/ch07.js';
import ch08 from './chapters/ch08.js';
import ch09 from './chapters/ch09.js';
import ch10 from './chapters/ch10.js';
import ch11 from './chapters/ch11.js';
import ch12 from './chapters/ch12.js';
import ch13 from './chapters/ch13.js';
import ch14 from './chapters/ch14.js';
import ch15 from './chapters/ch15.js';
import ch16 from './chapters/ch16.js';
import ch17 from './chapters/ch17.js';
import ch18 from './chapters/ch18.js';
import ch19 from './chapters/ch19.js';
import ch20 from './chapters/ch20.js';

export const chapters = [
  ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10,
  ch11, ch12, ch13, ch14, ch15, ch16, ch17, ch18, ch19, ch20
];

export const getChapter = (id) => chapters.find(c => c.id === id);
export const getChapterBySlug = (slug) => chapters.find(c => c.slug === slug);
export const year1Chapters = () => chapters.filter(c => c.year === 1);
export const year2Chapters = () => chapters.filter(c => c.year === 2);
