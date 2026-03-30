import React, { useState } from "react";
import { Utensils } from "lucide-react"; // Ícono genérico

// Productos agrupados por categoría
const categorias = {
  Tacos: [
    { nombre: "Cecina", precio: 30, icono: Utensils },
    { nombre: "Aguja de Res", precio: 30, icono: Utensils },
    { nombre: "Campechano", precio: 30, icono: Utensils },
    { nombre: "Guisado", precio: 27, icono: Utensils },
    { nombre: "Pechuga de Pollo", precio: 27, icono: Utensils },
    { nombre: "Longaniza", precio: 27, icono: Utensils },
    { nombre: "Bistek", precio: 27, icono: Utensils },
  ],
  Comida: [
    { nombre: "Guisado en plato", precio: 65, icono: Utensils },
    { nombre: "Caldo", precio: 90, icono: Utensils },
  ],
  Bebidas: [
    { nombre: "Refresco", precio: 27, icono: Utensils },
    { nombre: "Café", precio: 17, icono: Utensils },
    { nombre: "Atole", precio: 17, icono: Utensils },
    { nombre: "Agua Sabor 1L", precio: 32, icono: Utensils },
    { nombre: "Agua Sabor 1/2L", precio: 17, icono: Utensils },
    { nombre: "Agua Natural 1L", precio: 17, icono: Utensils },
    { nombre: "Agua Natural 1/2L", precio: 10, icono: Utensils },
  ],
  Extra: [{ nombre: "Pan", precio: 17, icono: Utensils }],
};

// Colores de fondo para cada categoría
const colores = {
  Tacos: "#ffe5e5", // rojo suave
  Comida: "#fff3cd", // amarillo suave
  Bebidas: "#d4edda", // verde suave
  Extra: "#d1ecf1", // azul suave
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

  const resetCuenta = () => {
    setCuenta({});
    setTotal(0);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "'Segoe UI', Arial, sans-serif",
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
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "28px",
            marginBottom: "10px",
            color: "#2c3e50",
          }}
        >
          Sabor a Oaxaca
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1f2937",
            color: "white",
            padding: "12px 16px",
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
              padding: "10px 16px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Limpiar Cuenta
          </button>
        </div>
      </div>

      {/* Contenido scrollable */}
      <div style={{ padding: "15px" }}>
        {Object.keys(categorias).map((cat) => (
          <div
            key={cat}
            style={{
              marginBottom: "25px",
              backgroundColor: colores[cat],
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "22px",
                marginBottom: "12px",
                color: "#34495e",
              }}
            >
              {cat}
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {categorias[cat].map((p) => {
                const Icono = p.icono;
                return (
                  <button
                    key={p.nombre}
                    onClick={() => agregarProducto(p)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      padding: "18px",
                      textAlign: "left",
                      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                      fontSize: "18px",
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
                      <span style={{ fontWeight: "600" }}>{p.nombre}</span>
                    </div>
                    <div style={{ fontSize: "16px" }}>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ${p.precio}
                      </span>
                      {cuenta[p.nombre] && (
                        <span
                          style={{
                            color: "#3498db",
                            marginLeft: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          x{cuenta[p.nombre].cantidad}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
