import React, { useState, useEffect } from "react";
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
  ClipboardList,
  Trash2,
  CheckCircle2,
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
  const [verHistorial, setVerHistorial] = useState(false);

  const [historial, setHistorial] = useState(() => {
    const guardado = localStorage.getItem("ventas_oaxaca");
    return guardado ? JSON.parse(guardado) : [];
  });

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

  const registrarVenta = () => {
    const nuevaVenta = {
      id: Date.now(),
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      detalle: Object.entries(cuenta)
        .map(([nom, data]) => `${data.cantidad}x ${nom}`)
        .join(", "),
      monto: total,
    };
    const nuevoHistorial = [nuevaVenta, ...historial];
    setHistorial(nuevoHistorial);
    localStorage.setItem("ventas_oaxaca", JSON.stringify(nuevoHistorial));
    setCuenta({});
    setTotal(0);
    setMostrarQR(false);
  };

  const limpiarHistorial = () => {
    if (window.confirm("¿Borrar todas las ventas del día?")) {
      setHistorial([]);
      localStorage.removeItem("ventas_oaxaca");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "sans-serif",
        paddingBottom: "80px",
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
              onClick={() => {
                setCuenta({});
                setTotal(0);
              }}
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
            }}
          >
            <QrCode size={22} /> COBRAR (QR)
          </button>
        </div>
      </div>

      {/* MODAL DEL QR */}
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
              padding: "20px",
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
              }}
            >
              <X size={28} color="#95a5a6" />
            </button>
            <h2 style={{ color: "#2c3e50", margin: "10px 0" }}>
              Total a Pagar: ${total}.00
            </h2>
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
                alt="QR"
                style={{ width: "100%", borderRadius: "5px" }}
              />
            </div>
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "10px",
              }}
            >
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
                  margin: "0",
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "#2c3e50",
                }}
              >
                002 010 9041 0853 8830
              </p>
              <p style={{ margin: "0", fontSize: "18px", color: "#2c3e50" }}>
                Sabor a Oaxaca
              </p>
            </div>
            <button
              onClick={registrarVenta}
              style={{
                marginTop: "15px",
                width: "100%",
                backgroundColor: "#27ae60",
                color: "white",
                padding: "15px",
                borderRadius: "12px",
                border: "none",
                fontWeight: "bold",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <CheckCircle2 size={24} /> CONFIRMAR Y REGISTRAR
            </button>
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
                fontSize: "18px",
                marginBottom: "12px",
                color: "#34495e",
              }}
            >
              {cat}
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
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
                    }}
                  >
                    <button
                      onClick={() => quitarProducto(p)}
                      style={{
                        border: "none",
                        backgroundColor: "#f8f9fa",
                        color: "#e74c3c",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      <Minus size={18} />
                    </button>
                    <div
                      onClick={() => agregarProducto(p)}
                      style={{ flex: 1, padding: "0 10px", cursor: "pointer" }}
                    >
                      <div style={{ fontWeight: "600" }}>
                        {p.nombre} <Icono size={16} />
                      </div>
                      <div style={{ color: "#27ae60", fontWeight: "bold" }}>
                        ${p.precio}{" "}
                        {cantidad > 0 && (
                          <span style={{ color: "#3498db" }}>x{cantidad}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => agregarProducto(p)}
                      style={{
                        border: "none",
                        backgroundColor: "#f0f7ff",
                        color: "#3498db",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Historial */}
      <div
        style={{
          padding: "15px",
          borderTop: "2px solid #ddd",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setVerHistorial(!verHistorial)}
          style={{
            width: "100%",
            backgroundColor: "#7f8c8d",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <ClipboardList size={20} />{" "}
          {verHistorial ? "Ocultar Ventas" : "Ver Ventas del Día"} (
          {historial.length})
        </button>
        {verHistorial && (
          <div style={{ marginTop: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Ventas Realizadas</h3>
              <button
                onClick={limpiarHistorial}
                style={{
                  color: "#e74c3c",
                  background: "none",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Trash2 size={16} /> Borrar todo
              </button>
            </div>
            {historial.length === 0 ? (
              <p>No hay ventas registradas.</p>
            ) : (
              historial.map((v) => (
                <div
                  key={v.id}
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    marginBottom: "8px",
                    borderLeft: "5px solid #27ae60",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    <span>{v.hora}</span>
                    <span>${v.monto}.00</span>
                  </div>
                  <div style={{ color: "#7f8c8d", fontSize: "14px" }}>
                    {v.detalle}
                  </div>
                </div>
              ))
            )}
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#1f2937",
                color: "white",
                borderRadius: "10px",
                textAlign: "right",
              }}
            >
              <strong>
                Venta Total: ${historial.reduce((sum, v) => sum + v.monto, 0)}
                .00
              </strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
