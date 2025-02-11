import { useRouter } from 'next/router'

export default function Hotel() {
  const router = useRouter()
  const { id } = router.query

  return <p>Отель: {id}</p>
}
