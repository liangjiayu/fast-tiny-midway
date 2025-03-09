import { z } from 'zod';

export const UserUpdateSchema = z
  .object({
    phoneNumber: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确'),
    gender: z.number().refine(val => [1, 2, 3].includes(val), {
      message: '性别编码不正确',
    }),
    nickname: z.string().min(2).max(20),
    profilePictureUrl: z.string().url('头像URL格式不正确'),
    metadata: z.object({
      blogUrl: z.string().url('博客链接格式不正确'),
      facebookUrl: z.string().url('facebook链接格式不正确'),
      contacts: z.array(
        z.object({
          name: z.string().nonempty('联系人姓名不能为空'),
          phone: z.string().regex(/^1[3-9]\d{9}$/, '联系人手机号格式不正确'),
        }),
      ),
    }),
  })
  .partial();
