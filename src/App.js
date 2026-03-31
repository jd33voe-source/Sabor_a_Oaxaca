import React, { useState } from "react";
import {
  CupSoda,
  Coffee,
  GlassWater,
  CookingPot,
  Plus,
  Minus,
} from "lucide-react";

// Iconos personalizados con Emojis
const TacoIcon = ({ size = 22 }) => (
  <span style={{ fontSize: `${size}px` }}>🌮</span>
);
const PanIcon = ({ size = 22 }) => (
  <span style={{ fontSize: `${size}px` }}>🍞</span>
);

const categorias = {
  Tacos: [
    { nombre: "Cecina", precio: 30, icono: TacoIcon },
    { nombre: "Aguja de Res", precio: 30, icono: TacoIcon },
    { nombre: "Campechano", precio: 30, icono: TacoIcon },
    { nombre: "Guisado", precio: 27, icono: TacoIcon },
    { nombre: "Pechuga de Pollo", precio: 27, icono: TacoIcon },
    { nombre: "Longaniza", precio: 27, icono: TacoIcon },
    { nombre: "Bistek", precio: 27, icono: TacoIcon },
  ],
  Comida: [
    { nombre: "Guisado en plato", precio: 65, icono: CookingPot },
    { nombre: "Caldo", precio: 90, icono: CookingPot },
  ],
  Bebidas: [
    { nombre: "Refresco", precio: 27, icono: CupSoda },
    { nombre: "Café", precio: 17, icono: Coffee },
    { nombre: "Atole", precio: 17, icono: Coffee },
    { nombre: "Agua Sabor 1L", precio: 32, icono: GlassWater },
    { nombre: "Agua Sabor 1/2L", precio: 17, icono: GlassWater },
    { nombre: "Agua Natural 1L", precio: 17, icono: GlassWater },
    { nombre: "Agua Natural 1/2L", precio: 10, icono: GlassWater },
  ],
  Extra: [{ nombre: "Pan", precio: 17, icono: PanIcon }],
};

const colores = {
  Tacos: "#ffe5e5",
  Comida: "#fff3cd",
  Bebidas: "#d4edda",
  Extra: "#d1ecf1",
};

export default function POSApp() {
  const [cuenta, setCuenta] = useState({});
  const [total, setTotal] = useState(0);

  const agregarProducto = (producto) => {
    setCuenta((prev) => {
      const cantidad = (prev[producto.nombre]?.cantidad || 0) + 1;
      return {
        ...prev,
        [producto.nombre]: { precio: producto.precio, cantidad },
      };
    });
    setTotal((prev) => prev + producto.precio);
  };

  const quitarProducto = (producto) => {
    if (!cuenta[producto.nombre]) return;

    setCuenta((prev) => {
      const nuevaCantidad = prev[producto.nombre].cantidad - 1;
      if (nuevaCantidad <= 0) {
        const nuevaCuenta = { ...prev };
        delete nuevaCuenta[producto.nombre];
        return nuevaCuenta;
      }
      return {
        ...prev,
        [producto.nombre]: {
          ...prev[producto.nombre],
          cantidad: nuevaCantidad,
        },
      };
    });
    setTotal((prev) => prev - producto.precio);
  };

  const resetCuenta = () => {
    setCuenta({});
    setTotal(0);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header fijo */}
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#f3f4f6",
          padding: "10px",
          zIndex: 1000,
        }}
      >
        <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
          Sabor a Oaxaca
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1f2937",
            color: "white",
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Total: ${total}
          </span>
          <button
            onClick={resetCuenta}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Productos */}
      <div style={{ padding: "15px" }}>
        {Object.keys(categorias).map((cat) => (
          <div
            key={cat}
            style={{
              marginBottom: "20px",
              backgroundColor: colores[cat],
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>{cat}</h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {categorias[cat].map((p) => {
                const Icono = p.icono;
                const cantidad = cuenta[p.nombre]?.cantidad || 0;
                return (
                  <div
                    key={p.nombre}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* Botón de Menos */}
                    <button
                      onClick={() => quitarProducto(p)}
                      style={{
                        border: "none",
                        backgroundColor: cantidad > 0 ? "#ffeded" : "#f5f5f5",
                        color: "#e74c3c",
                        padding: "10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <Minus size={20} />
                    </button>

                    {/* Info del Producto (Click aquí también agrega) */}
                    <div
                      onClick={() => agregarProducto(p)}
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 15px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Icono size={22} />
                        <div>
                          <div style={{ fontWeight: "600" }}>{p.nombre}</div>
                          <div style={{ color: "green", fontSize: "14px" }}>
                            ${p.precio}
                          </div>
                        </div>
                      </div>
                      {cantidad > 0 && (
                        <span
                          style={{
                            backgroundColor: "#3498db",
                            color: "white",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {cantidad}
                        </span>
                      )}
                    </div>

                    {/* Botón de Más */}
                    <button
                      onClick={() => agregarProducto(p)}
                      style={{
                        border: "none",
                        backgroundColor: "#e8f4fd",
                        color: "#3498db",
                        padding: "10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
