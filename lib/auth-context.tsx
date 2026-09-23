"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
  updateProfile,
  deleteUser,
} from "firebase/auth"
import { auth, storage } from "@/lib/firebase-config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>
  uploadProfileImage: (file: File) => Promise<string>
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  const updateUserProfile = async (displayName?: string, photoURL?: string) => {
    if (!user) return

    const updateData: { displayName?: string; photoURL?: string } = {}
    if (displayName) updateData.displayName = displayName
    if (photoURL) updateData.photoURL = photoURL

    await updateProfile(user, updateData)
    setUser({ ...user, ...updateData } as User)
  }

  const uploadProfileImage = async (file: File): Promise<string> => {
    if (!user) throw new Error("No user logged in")

    const storageRef = ref(storage, `profile_images/${user.uid}/${file.name}`)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)

    await updateUserProfile(undefined, downloadURL)
    return downloadURL
  }

  const deleteAccount = async () => {
    if (!user) return
    await deleteUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, updateUserProfile, uploadProfileImage, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
