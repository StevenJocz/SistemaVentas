import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';
import { generarToken } from '@/utils/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {

    const { correo, clave } = await req.json();

    const usuario = await prisma.usuarios.findFirst({
        where: { correo: correo }
    });

    if (!usuario) {
        return NextResponse.json(
            { result: false, error: 'Usuario no encontrado' },
            { status: 404 }
        );
    }

    // Verificar la contraseña
    const claveCorrecta = clave === usuario.contrasena;
    //const claveCorrecta = await bcrypt.compare(clave, usuario.s_clave);

    if (!claveCorrecta) {
        return NextResponse.json(
            { result: false, error: 'Clave incorrecta' },
            { status: 401 }
        );
    }

    const token = generarToken({ id: usuario.contrasena, correo: usuario.correo });

    return NextResponse.json({ result: true, token });
}
