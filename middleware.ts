import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const protectedRoutes = [
    '/dashboard', 
    '/clientes', 
    '/produtos', 
    '/fornecedores'];
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    // Se não tem access token mas tem refresh token, tenta renovar
    if (!accessToken && refreshToken) {
      try {
        const refreshResponse = await fetch('http://localhost:8080/auth/refresh', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `refresh_token=${refreshToken}`
          }
        });

        if (refreshResponse.ok) {
          // Extrai o novo access token do cookie da resposta
          const setCookieHeader = refreshResponse.headers.get('set-cookie');
          if (setCookieHeader) {
            const response = NextResponse.next();
            response.headers.append('set-cookie', setCookieHeader);
            return response;
          }
          return NextResponse.next();
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }

    // Valida o token atual
    try {
      const validateResponse = await fetch('http://localhost:8080/auth/validate', {
        credentials: 'include',
        headers: {
          'Cookie': `access_token=${accessToken}`
        }
      });
      
      if (!validateResponse.ok) throw new Error('Validation failed');
      
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|_next/static|_next/image|favicon.ico|api).*)',
  ],
};


















// middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const protectedRoutes = ['/dashboard', '/clientes', '/produtos', '/fornecedores'];
//   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

//   if (isProtectedRoute) {
//     const accessToken = request.cookies.get('access_token')?.value;
//     const refreshToken = request.cookies.get('refresh_token')?.value;

//     // Se não tem access token mas tem refresh token, tenta renovar
//     if (!accessToken && refreshToken) {
//       try {
//         const refreshResponse = await fetch('http://localhost:8080/auth/refresh', {
//           method: 'POST',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json'          },
//         });

//         if (refreshResponse.ok) {
//           // Se renovou com sucesso, continua a requisição
//           return NextResponse.next();
//         }
//       } catch (error) {
//         console.error('Failed to refresh token:', error);
//       }
//     }

//     // Se não tem nenhum token válido, redireciona para login
//     if (!accessToken) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // Valida o token atual
//     try {
//       const res = await fetch('http://localhost:8080/auth/validate', {
//         credentials: 'include',
//         headers: {
//           'Cookie': `access_token=${accessToken}`
//         },
//       });
      
//       if (!res.ok) throw new Error('Validation failed');
      
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   }

//   return NextResponse.next();
// }







// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//     console.log('INICIANDO O Middleware');
//     const { pathname } = request.nextUrl;

//     const protectedRoutes = ['/dashboard', '/clientes', '/produtos', '/fornecedores'];
//     const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

//     if (isProtectedRoute) {
//         console.log('Middleware: Protected route accessed:', pathname);
        
//         const accessToken = request.cookies.get('access_token')?.value;
        
//         if (!accessToken) {
//             console.log('Middleware: No access token found, redirecting to login');
//             return NextResponse.redirect(new URL('/login', request.url));
//         }

//         try {
//             const res = await fetch('http://localhost:8080/auth/validate', {
//                 method: 'GET',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cookie': `access_token=${accessToken}`
//                 },
//             });
            
//             console.log('Middleware: Validation status:', res.status);
            
//             if (!res.ok) {
//                 console.log('Middleware: Validation failed');
//                 return NextResponse.redirect(new URL('/login', request.url));
//             }
            
//             return NextResponse.next();
//         } catch (error) {
//             console.error('Middleware: Authentication check failed:', error);
//             return NextResponse.redirect(new URL('/login', request.url));
//         }
//     }

//     return NextResponse.next();
// }










// import { NextRequest, NextResponse } from "next/server";
// import api from "./lib/api";

// export async function middleware(request: NextRequest) {
//   console.log('INICIANDO O Middleware');
//   const { pathname } = request.nextUrl;

//   const protectedRoutes = ['/dashboard', '/clientes', '/produtos', '/fornecedores'];
//   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

//   if (isProtectedRoute) {
//     console.log('Middleware: Protected route accessed:', pathname);
    
//     // Verifica se há um cookie de acesso diretamente
//     const accessToken = request.cookies.get('access_token')?.value;
    
//     if (!accessToken) {
//       console.log('Middleware: No access token found, redirecting to login');
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     try {
//       // Usando Axios para fazer a validação
//       const response = await api.get('/auth/validate', {
//         headers: {
//           Cookie: `access_token=${accessToken}`
//         }
//       });
      
//       if (response.status !== 200) {
//         throw new Error('Validation failed');
//       }
      
//       return NextResponse.next();
//     } catch (error) {
//       console.error('Middleware: Authentication check failed:', error);
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/((?!login|_next/static|_next/image|favicon.ico|api).*)',
//   ],
// };