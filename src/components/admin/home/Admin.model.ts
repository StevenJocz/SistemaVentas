export interface WidgetVantas {
    id: number;
    nombre: string;
    total: number;
}

export interface WidgetCursos {
    id: number;
    nombre: string;
    valor: number;
}

export interface WidgetTotal {
    id: number;
    nombre: string;
    valor: number;
    texto: string;
    icono: React.ElementType;
}

export interface dataInscripciones {
    id: number;
    nombre: string;
    fecha: string;
    curso: string;
    estado: string;
}

export interface ObjectWidget {
    ventas: WidgetVantas[];
    total: WidgetTotal[];
}