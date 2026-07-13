import type { APIRoute } from 'astro';
import { renderResume } from '../pdf/render';

export const prerender = true;

export const GET: APIRoute = () => renderResume('pt');
