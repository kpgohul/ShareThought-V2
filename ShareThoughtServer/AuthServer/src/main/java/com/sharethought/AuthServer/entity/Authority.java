package com.sharethought.AuthServer.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Builder
@SequenceGenerator(
        name = "authority_seq",
        sequenceName = "authority_seq",
        initialValue = 10000,
        allocationSize = 1
)
public class    Authority {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "authority_seq")
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String description;
    @ManyToMany(mappedBy = "authorities", targetEntity = Account.class)
    private Set<Account> accounts = new LinkedHashSet<>();
}
