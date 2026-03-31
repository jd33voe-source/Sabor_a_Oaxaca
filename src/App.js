import React, { useState } from "react";
import {
  Beef,
  CupSoda,
  Coffee,
  GlassWater,
  Soup,
  Plus,
  Minus,
  QrCode,
  X,
} from "lucide-react";

// Iconos personalizados
const TacoIcon = ({ size = 22 }) => (
  <span style={{ fontSize: `${size}px` }}>🌮</span>
);
const PanIcon = ({ size = 22 }) => (
  <span style={{ fontSize: `${size}px` }}>🍞</span>
);

const categorias = {
  Tacos: [
    { nombre: "Cecina", precio: 30, icono: TacoIcon },
    { nombre: "Aguja de Res", precio: 30, icono: Beef },
    { nombre: "Campechano", precio: 30, icono: TacoIcon },
    { nombre: "Guisado", precio: 27, icono: TacoIcon },
    { nombre: "Pechuga de Pollo", precio: 27, icono: TacoIcon },
    { nombre: "Longaniza", precio: 27, icono: TacoIcon },
    { nombre: "Bistek", precio: 27, icono: Beef },
  ],
  Comida: [
    { nombre: "Guisado en plato", precio: 65, icono: Soup },
    { nombre: "Caldo", precio: 90, icono: Soup },
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
  const [mostrarQR, setMostrarQR] = useState(false);

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
    if (window.confirm("¿Estás seguro de limpiar toda la cuenta?")) {
      setCuenta({});
      setTotal(0);
      setMostrarQR(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "sans-serif",
        paddingBottom: "20px",
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
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2c3e50",
            margin: "5px 0",
            fontSize: "24px",
          }}
        >
          Sabor a Oaxaca
        </h1>
        <div
          style={{
            backgroundColor: "#1f2937",
            color: "white",
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "22px" }}>
              Total: ${total}
            </span>
            <button
              onClick={resetCuenta}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Limpiar
            </button>
          </div>
          <button
            onClick={() => total > 0 && setMostrarQR(true)}
            disabled={total === 0}
            style={{
              width: "100%",
              backgroundColor: total > 0 ? "#3498db" : "#95a5a6",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              cursor: total > 0 ? "pointer" : "default",
            }}
          >
            <QrCode size={22} /> MOSTRAR QR DE PAGO
          </button>
        </div>
      </div>

      {/* MODAL DEL QR (CORREGIDO) */}
      {mostrarQR && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            zIndex: 2000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "350px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => setMostrarQR(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <X size={28} color="#95a5a6" />
            </button>
            <h2 style={{ color: "#2c3e50", marginBottom: "5px" }}>
              Escanea para Pagar
            </h2>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#27ae60",
                marginBottom: "20px",
              }}
            >
              ${total}.00
            </p>
            <div
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #eee",
              }}
            >
              <img
                src="qr-pago.png"
                alt="QR Banamex"
                style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/250?text=Sube+tu+QR+a+public")
                }
              />
            </div>
            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "12px",
                border: "1px solid #e9ecef",
              }}
            >
              <p
                style={{
                  margin: "0 0 5px 0",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#7f8c8d",
                  textTransform: "uppercase",
                }}
              >
                Datos de Transferencia
              </p>
              <p
                style={{
                  margin: "0",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#2c3e50",
                }}
              >
                CLABE Banamex
              </p>
              <p
                style={{
                  margin: "5px 0",
                  fontSize: "17px",
                  color: "#2c3e50",
                  letterSpacing: "1px",
                  fontWeight: "600",
                }}
              >
                002 010 9041 0853 8830
              </p>
              <p
                style={{
                  margin: "5px 0 0 0",
                  fontSize: "18px",
                  color: "#34495e",
                  fontStyle: "italic",
                }}
              >
                Sabor a Oaxaca
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Productos */}
      <div style={{ padding: "15px" }}>
        {Object.keys(categorias).map((cat) => (
          <div
            key={cat}
            style={{
              marginBottom: "20px",
              backgroundColor: colores[cat],
              padding: "15px",
              borderRadius: "15px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                marginBottom: "12px",
                color: "#34495e",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              {cat}
            </h2>
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
                      borderRadius: "12px",
                      padding: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <button
                      onClick={() => quitarProducto(p)}
                      style={{
                        border: "none",
                        backgroundColor: cantidad > 0 ? "#fff0f0" : "#f8f9fa",
                        color: "#e74c3c",
                        padding: "12px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <Minus size={20} strokeWidth={3} />
                    </button>
                    <div
                      onClick={() => agregarProducto(p)}
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 12px",
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
                        <Icono size={24} />
                        <div>
                          <div style={{ fontWeight: "600", fontSize: "16px" }}>
                            {p.nombre}
                          </div>
                          <div
                            style={{
                              color: "#27ae60",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            ${p.precio}
                          </div>
                        </div>
                      </div>
                      {cantidad > 0 && (
                        <span
                          style={{
                            backgroundColor: "#3498db",
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          {cantidad}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => agregarProducto(p)}
                      style={{
                        border: "none",
                        backgroundColor: "#f0f7ff",
                        color: "#3498db",
                        padding: "12px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={20} strokeWidth={3} />
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
